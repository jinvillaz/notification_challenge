import { useCallback, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { ContactPhone, Email, Notifications as NotificationsIcon, Sms } from '@mui/icons-material'
import { FormikHelpers, useFormik } from 'formik'
import { selectCategories } from '../../reducers/categories/categories.selectors'
import { getCategories } from '../../reducers/categories/categories.actions'
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { Category } from '../../model/category'
import { validationSchema } from './schema'
import { createNotification, getNotifications } from '../../reducers/notifications/notifications.actions'
import { selectNotifications } from '../../reducers/notifications/notifications.selectors'
import { Notification } from '../../model/notification'

interface FormValues {
  category: string
  message: string
}

export const Home = () => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector<Category[]>(selectCategories)
  const notifications = useAppSelector(selectNotifications)

  const onSubmit = useCallback((values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    dispatch(createNotification(values))
    resetForm({ values: { category: categories[0]._id, message: '' } })
  }, [categories, dispatch])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: '',
      message: '',
    },
    validationSchema,
    onSubmit,
  })

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getNotifications())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (categories.length > 0 && !formik.values.category) {
      formik.setFieldValue('category', categories[0]._id)
    }
  }, [categories, formik])

  return (
    <Grid container sx={{ height: '100%', flexFlow: 'column', paddingLeft: '50px', paddingRight: '50px' }}>
      <Grid container sx={{ height: '200px', width: '100%' }}>
        <Grid item xs={12} textAlign="center">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100%">
            <ContactPhone style={{ fontSize: '60px', paddingRight: '25px' }} />{' '}
            <Typography variant="h2"> Notification System</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ width: '100%', padding: 2 }}>
        <form onSubmit={formik.handleSubmit} style={{ width: '80%', justifyContent: 'center' }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.category && formik.errors.category && <div>{formik.errors.category}</div>}
          </FormControl>
          <TextField
            name="message"
            label="Message"
            fullWidth
            multiline
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" disabled={!formik.dirty || Object.keys(formik.errors).length > 0}>
            Send
          </Button>
        </form>
      </Grid>
      <Grid container sx={{ height: '100%', width: '100%', flexGrow: '1', overflowY: 'auto', marginTop: '30px' }}>
        <Grid item xs={12}>
          <List>
            {notifications.map((item: Notification, index) => (
              <ListItem key={index} sx={{ border: 1, borderColor: 'grey.400' }}>
                <ListItemIcon>
                  {item.channel.name === 'email' && <Email sx={{ fontSize: 34 }} />}
                  {item.channel.name === 'sms' && <Sms sx={{ fontSize: 34 }} />}
                  {item.channel.name === 'push-notification' && <NotificationsIcon sx={{ fontSize: 34 }} />}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h6">
                      User: {item.user.name} - Email: {item.user.email} - Phone: {item.user.phone}
                    </Typography>
                  }
                  secondary={
                    <Box style={{ display: 'flex', alignItems: 'center' }} color="grey.500">
                      <Typography variant="body2">Message: {item.message}</Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
}
